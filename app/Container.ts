import {
    SocketManager, PluginManager, WatchDog, Scheduler, MongoConnection, AppLogger, Configuration
} from 'dm-dashboard-core';

import { WebServer } from './web/WebServer';


import { ReflectiveInjector } from 'injection-js';

const container = ReflectiveInjector.resolveAndCreate([
    Configuration, AppLogger, MongoConnection, WebServer,
    Scheduler, WatchDog, PluginManager, SocketManager
]);

export { container };
