import {container} from 'tsyringe';

import { IDateProvider } from './dateProvider/IDateProvider';
import { DayJsDateProvider } from './dateProvider/implementation/DayJsDateProvider';
import { IMailProvider } from './mailProvider/IMailProvider';
import { MailProvider } from './mailProvider/implementation/MailProvider';


container.registerInstance<IMailProvider>("MailProvider", new MailProvider());
container.registerSingleton<IDateProvider>("DayJsDateProvider", DayJsDateProvider);