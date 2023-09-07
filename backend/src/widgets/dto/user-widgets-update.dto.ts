import { WidgetName, widgetNames } from '../model/user-widgets.entity';
import { IsArray, IsEnum } from 'class-validator';

export default class UserWidgetsUpdateDto {
  @IsArray()
  @IsEnum(widgetNames, { each: true })
  newWidgetNames!: WidgetName[];
}
