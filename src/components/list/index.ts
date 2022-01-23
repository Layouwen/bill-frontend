import { composeExportComponent } from '@/utils';
import { List } from './List';
import { ListItem } from './ListItem';
import './index.scss';

export default composeExportComponent(List, {
  Item: ListItem,
});
