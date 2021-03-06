import {
    SocketManager, PluginManager, WatchDog, Scheduler, MongoConnection, AppLogger, Configuration
} from 'dm-dashboard-core';


import { WebServer } from './web/WebServer';
import { ReflectiveInjector } from 'injection-js';

export class DMDashboard {
    logger: AppLogger;
    env: string;
    webServer: WebServer;
    mongo: MongoConnection;
    scheduler: Scheduler;
    watchDog: WatchDog;
    pluginManager: PluginManager;
    socketManager: SocketManager;

    constructor() {

    }

    start(container: ReflectiveInjector) {

        try {
            let config = container.get(Configuration);
            this.logger = container.get(AppLogger);
            this.logger.info(`DM-Dashboard starting up. Loading Settings for ENV=${config.environment}`);
            this.mongo = container.get(MongoConnection);
            this.mongo.connect(this.logger.fork('mongo'))
                .then(() => {

                    this.webServer = container.get(WebServer);
                    let httpServer = this.webServer.start(this.logger.fork('express'));

                    this.scheduler = container.get(Scheduler);
                    this.watchDog = container.get(WatchDog);
                    this.watchDog.setLogger(this.logger.fork('watchdog'));
                    this.socketManager = container.get(SocketManager);
                    this.socketManager.listen(this.logger.fork('socket-manager'), httpServer);

                    this.pluginManager = container.get(PluginManager);
                    this.pluginManager.load(this.logger.fork('plugin-manager'), this.logger, container);

                    this.watchDog.start(this.pluginManager);

                    this.logger.info('All components started, kicking off scheduler');
                    this.scheduler.start(this.logger.fork('scheduler'))
                        .catch((error) => this.logger.error(error))
                        .then(() => this.shutdown());
                });
        } catch (error) {
            if (this.logger) {
                this.logger.error('Could not start up:');
                this.logger.error(error.message || error);
            } else {
                console.error('Could not start up:');
                console.error(error);
            }
            return;
        }
    }


    shutdown(): Promise<any> {
        return new Promise((resolve) => {
            this.logger.info('Shutting down');
            this.pluginManager.shutdown();
            this.watchDog.shutdown();
            this.socketManager.shutdown();
            this.mongo.close();
            this.webServer.shutdown();
            this.logger.info('Shutting down complete');
            resolve();
        });
    }
}
