type iconType = {
  id?: number;
  name: string;
  icon: string;
};

const mainList: iconType[] = [
  {
    name: '餐饮',
    icon: 'canyin1',
  },
  {
    name: '购物',
    icon: 'icon-',
  },
  {
    name: '日用',
    icon: 'riyongbaihuo',
  },
  {
    name: '交通',
    icon: 'jiaotong',
  },
  {
    name: '蔬菜',
    icon: 'shucai',
  },
  {
    name: '水果',
    icon: 'shuiguo',
  },
  {
    name: '零食',
    icon: 'lingshi',
  },
  {
    name: '运动',
    icon: 'yundong',
  },
  {
    name: '娱乐',
    icon: 'yule',
  },
  {
    name: '通讯',
    icon: 'tongxun',
  },
  {
    name: '服饰',
    icon: 'fushi',
  },
  {
    name: '美容',
    icon: 'shouye',
  },
  {
    name: '住房',
    icon: 'zhufang',
  },
  {
    name: '居家',
    icon: 'jiajujiafang',
  },
  {
    name: '孩子',
    icon: 'shouye1',
  },
  {
    name: '长辈',
    icon: 'grandfather',
  },
  {
    name: '社交',
    icon: 'shejiao',
  },
  {
    name: '旅行',
    icon: 'lvhang-',
  },
  {
    name: '烟酒',
    icon: 'yanjiu',
  },
  {
    name: '数码',
    icon: 'shujuxian',
  },
  {
    name: '汽车',
    icon: 'qiche',
  },
  {
    name: '医疗',
    icon: 'yiliao',
  },
  {
    name: '书籍',
    icon: 'shuji',
  },
  {
    name: '学习',
    icon: 'xuexiwangke',
  },
  {
    name: '宠物',
    icon: 'xiedaichongwu',
  },
  {
    name: '礼金',
    icon: 'tuijianlijin',
  },
  {
    name: '礼物',
    icon: 'liwu',
  },
  {
    name: '办公',
    icon: 'bangong',
  },
  {
    name: '维修',
    icon: 'weixiu',
  },
  {
    name: '捐赠',
    icon: 'aixinjuanzeng',
  },
  {
    name: '彩票',
    icon: 'caipiao',
  },
  {
    name: '亲友',
    icon: 'a-24-30_fuzhi-04',
  },
  {
    name: '快递',
    icon: 'kuaidiyuan',
  },
  {
    name: '设置',
    icon: 'shezhi',
  },
];

const mainListFn = () => {
  for (let i = 0; i < mainList.length; i++) {
    mainList[i].id = i + 1;
  }
};

mainListFn();

export default mainList;
