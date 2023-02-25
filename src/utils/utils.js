export class MenuClass {
  constructor(name, icon, slug) {
    this.name = name;
    this.icon = icon;
    this.slug = slug;
  }
}

export class CardClass {
  constructor(icon, title, value) {
    this.icon = icon;
    this.title = title;
    this.value = value;
  }
}

export class SelectClass {
  constructor(key, value, text) {
    this.key = key;
    this.value = value;
    this.text = text;
  }
}

export const tooglePasswordType = (passwordType, setPasswordType) => {
  if (passwordType === "password") {
    setPasswordType("text");
  } else {
    setPasswordType("password");
  }
};
