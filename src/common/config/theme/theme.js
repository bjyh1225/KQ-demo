//import {getThemeList,getDefaultCarouselFigure} from 'common/config/theme/theme.js'
const imageConfigList = {
  "default-theme": {
    "webp": {
      'chinese': [
        // "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel1.webp",
        "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel2.webp",
        "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel3.webp",
      ],
      'english': [
        // "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel1.webp",
        "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel2.webp",
        "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel3.webp",
      ]
    },
    "noWebp": {
      'chinese': [
        // "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel1.jpg",
        "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel2.jpg",
        "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel3.jpg",
      ],
      'english': [
        // "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel1.jpg",
        "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel2.jpg",
        "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel3.jpg",
      ]
    }
  },
  "navyblue-theme": {
    "webp": {
      'chinese': [
        // "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel1.webp",
        "config/imageConfig/system/theme/navyblueTheme/chinese/carousel/carousel2.webp",
        "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel3.webp",
      ],
      'english': [
        // "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel1.webp",
        "config/imageConfig/system/theme/navyblueTheme/english/carousel/carousel2.webp",
        "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel3.webp",
      ]
    },
    "noWebp": {
      'chinese': [
        // "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel1.jpg",
        "config/imageConfig/system/theme/navyblueTheme/chinese/carousel/carousel2.jpg",
        "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel3.jpg",
      ],
      'english': [
        // "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel1.jpg",
        "config/imageConfig/system/theme/navyblueTheme/english/carousel/carousel2.jpg",
        "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel3.jpg",
      ]
    }
  },
  "green-theme": {
    "webp": {
      'chinese': [
        // "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel1.webp",
        "config/imageConfig/system/theme/greenTheme/chinese/carousel/carousel2.webp",
        "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel3.webp",
      ],
      'english': [
        // "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel1.webp",
        "config/imageConfig/system/theme/greenTheme/english/carousel/carousel2.webp",
        "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel3.webp",
      ]
    },
    "noWebp": {
      'chinese': [
        // "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel1.jpg",
        "config/imageConfig/system/theme/greenTheme/chinese/carousel/carousel2.jpg",
        "config/imageConfig/system/theme/defaultTheme/chinese/carousel/carousel3.jpg",
      ],
      'english': [
        // "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel1.jpg",
        "config/imageConfig/system/theme/greenTheme/english/carousel/carousel2.jpg",
        "config/imageConfig/system/theme/defaultTheme/english/carousel/carousel3.jpg",
      ]
    }
  }
}

const theme = [
  {
    themeDesc: "蓝色主题",
    themeName: "theme.blueTheme",
    themeColor: "#3691e9",
    themeCode: "default-theme"
  },
  {
    themeDesc: "深蓝色主题",
    themeName: "theme.darkBlueTheme",
    themeColor: "#0079c1",
    themeCode: "navyblue-theme"
  },
  {
    themeDesc: "绿色主题",
    themeName: "theme.greenTheme",
    themeColor: "#18bc9c",
    themeCode: "green-theme"
  }
]

export function getThemeList() {
  return theme;
}

export function getDefaultCarouselFigure(themeCode, language) {
  var list = [];
  theme.forEach(element => {
    if (element.themeCode == themeCode && imageConfigList[themeCode]) {
      list = window.isWebP ? imageConfigList[themeCode]["webp"][language] : imageConfigList[themeCode]["noWebp"][language];
    }
  });
  return list;
}