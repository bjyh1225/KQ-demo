// 按需加载ElementUI组件
import {
  Form,
  FormItem,
  Button,
  ButtonGroup,
  Select,
  Option,
  OptionGroup,
  Input,
  Dialog,
  Row,
  Col,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  MessageBox,
  Message,
  Carousel,
  CarouselItem,
  Tabs,
  TabPane,
  Tree,
  Pagination,
  Table,
  TableColumn,
  Transfer,
  Image,
  Divider,
  Radio,
  RadioGroup,
  RadioButton,
  InputNumber,
  Upload,
  Cascader,
  CascaderPanel,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Autocomplete,
  Scrollbar,
  Collapse,
  CollapseItem,
  Popover,
  Switch,
  Tooltip,
  DatePicker,
  Steps,
  Step,
  Notification,
  Slider,
  Badge,
  Tag,
  Progress,
  Link,
  Timeline,
  TimelineItem
} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(Input);
    Vue.use(Button);
    Vue.use(ButtonGroup);
    Vue.use(Dialog);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Menu);
    Vue.use(Submenu);
    Vue.use(MenuItem);
    Vue.use(MenuItemGroup);
    Vue.use(Checkbox);
    Vue.use(CheckboxButton);
    Vue.use(CheckboxGroup);
    Vue.use(Carousel);
    Vue.use(CarouselItem);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Tree);
    Vue.use(Pagination);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Transfer);
    Vue.use(Image);
    Vue.use(Divider);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(RadioButton);
    Vue.use(InputNumber);
    Vue.use(Upload);
    Vue.use(Cascader);
    Vue.use(CascaderPanel);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Autocomplete);
    Vue.use(Scrollbar);
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Popover);
    Vue.use(Switch);
    Vue.use(Tooltip);
    Vue.use(DatePicker);
    Vue.use(Steps);
    Vue.use(Step);
    Vue.use(Slider);
    Vue.use(Badge);
    Vue.use(Tag);
    Vue.use(Progress);
    Vue.use(Link);
    Vue.use(Timeline);
    Vue.use(TimelineItem);
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$message = function (params) {
      params.showClose = true;
      Message(params);
    };
    Vue.prototype.$notify = Notification;
  }
}
export default element