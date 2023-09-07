import { Injectable } from '@nestjs/common';
import UserWidgets, {
  WidgetName,
  widgetNames,
} from './model/user-widgets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WidgetsService {
  constructor(
    @InjectRepository(UserWidgets)
    private readonly userWidgetsRepository: Repository<UserWidgets>,
  ) {}

  async getSelfUserWidgets(userEmail: string): Promise<WidgetName[]> {
    if (!(await this.userWidgetsRepository.exist({ where: { userEmail } }))) {
      return [];
    }
    const { widgets } = await this.userWidgetsRepository
      .findOneOrFail({
        where: { userEmail },
      })
      .catch(() => ({ widgets: [] as WidgetName[], userEmail }));
    return widgets;
  }

  async updateSelfUserWidgets(userEmail: string, newWidgetNames: WidgetName[]) {
    const userWidgets = await this.userWidgetsRepository
      .findOneOrFail({
        where: { userEmail },
      })
      .then(
        (userWidgets) =>
          ({ ...userWidgets, widgets: newWidgetNames }) as UserWidgets,
      )
      .catch(() => ({ userEmail, widgets: newWidgetNames }) as UserWidgets);
    return this.userWidgetsRepository.save(userWidgets);
  }

  async getAvailableWidgets(email: string) {
    const userWidgetNames = await this.getSelfUserWidgets(email);
    return widgetNames.filter(
      (widgetName) => !userWidgetNames.includes(widgetName),
    );
  }
}
