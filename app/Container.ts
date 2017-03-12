import {
    SocketManager, PluginManager, WatchDog, Scheduler, MongoConnection, AppLogger, Configuration
} from 'dmdashboard-core';

import { WebServer } from './web/WebServer';


import { ReflectiveInjector } from 'injection-js';

const container = ReflectiveInjector.resolveAndCreate([
    Configuration, AppLogger, MongoConnection, WebServer,
    Scheduler, WatchDog, PluginManager, SocketManager
]);

export { container };
