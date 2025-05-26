// resources/docs/internal/articles/structure.md
type Base = {
  id: string;
  type: string;
  name?: string;
  require?: boolean | number[]; // resources/docs/internal/authors/structure.md
  slug?: string;
  description?: string;
  position?: 'left' | 'center' | 'right';
  tip?: string;
} & Min & Max & Default & Ai;

type Default = {
  default?: string[] | number[] | boolean[] | object[] | [];
}
type Min = {
  min?: number; // 0 is unlimited quantity
}
type Max = {
  max?: number; // 0 is unlimited quantity
}
type Ai = {
  ai?: string[];
}


// (Optional) see Cabinet /resources/docs/internal/fields/type.md
type Placeholder = {
  placeholder?: string;
}

// type Tip = {
//   tip?: string;
// }
// type Description = {
//   description?: string;
// }
export type NumberLimit = [number | false, number | false];
export type FileLimit = [number, string[]];
export type TextLimit = number[];
type Limit = {
  /* false is no range
    Text: chars range
    Number: number range
    textarea: chars range
    hashtag: ??
    file: size, mime type
    image: width and height range
  */
  limit?: false | NumberLimit | TextLimit | FileLimit;
}
// type Type = {
//   type?: string;
// }

type Step = {
  step?: number;
}

type Prefix = {
  prefix?: string;
}
type Suffix = {
  suffix?: string;
}

// image data
type Ratio = {
  ratio?: boolean | number[]; // false is no ratio
}
type Viewport = {
  viewport?: boolean | number[]; // for display, false is no specific
}
type Fluid = {
  fluid?: 'rectangle' | 'circle';
}
// END

// type Position = {
//   position?: 'left' | 'center' | 'right';
// }
// type Slug = {
//   slug?: string;
// }


// option data for select, checkbox, radio
type Hierarchy = {
  hierarchy?: boolean;
}
type Choosable = {
  choosable?: number[];
}
type Total = {
  total?: number;
};
type Options = {
  key?: string;
  name?: string;
  own?: boolean;
  status?: boolean;
  children?: Options[];
  total?: number;
}

type OptionsObject = {
  options?: UnKnownOptions[];
}
export type UnKnownOptions = {
  [key: string | number]: unknown;
}

// select
export type SelectInputBind = {
  options?: SelectOptions[];
  hasNextPage?: boolean;
  activeStyle?: boolean;
  openFn?: () => void;
  closeFn?: () => void;
  infiniteFn?: () => void;
  reduce?: (option: UnKnownOptions) => string | number | undefined | null;
};
export type SelectOptions = {
  disabled?: boolean;
  depth?: number;
} & UnKnownOptions;

// checkbox 
export type CheckBoxInputBind = {
  options?: CheckBoxOptions[];
  label?: string;
  valueKey?: string;
  hasNextPage?: boolean;
  infiniteFn?: () => void;
}

export type CheckBoxOptions = {
  disabled?: boolean;
  depth?: number;
} & UnKnownOptions;

// radio

// END

// resources/docs/internal/fields/type.md

export type ModelValueSharp = Default;

export type TextSharp = Base & Placeholder & Prefix & Suffix & Limit;
export type TextareaSharp = Base & Placeholder & Limit;
export type UrlSharp = Base & Placeholder;
export type SelectSharp = Base & OptionsObject & Total & Choosable & Hierarchy & Placeholder;
export type CheckBoxSharp = Base & OptionsObject & Total & Choosable & Hierarchy;
export type RadioSharp = Base & OptionsObject & Total;

export type FieldDataSharp = Base & TextSharp & Step & Ratio & Viewport & Fluid & Hierarchy & Choosable & OptionsObject & Total;