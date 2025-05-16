// /resources/docs/internal/fields/type.md
type Base = {
  id: string;
  type: string;
  name?: string;
  require?: number[];
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
type Limit = {
  /* false is no range
    Text: chars range
    Number: number range
    textarea: chars range
    hashtag: ??
    file: size, mime type
    image: width and height range
  */
  limit?: false | NumberLimit | number[] | FileLimit;
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
type Option = {
  key?: string;
  name?: string;
  own?: boolean;
  status?: boolean;
  children?: Option[];
  total?: number;
}
// END

export type ModelValueSharp = Default;

export type TextSharp = Base & Placeholder & Prefix & Suffix & Limit;
export type UrlSharp = Base & Placeholder;

export type FieldDataSharp = Base & TextSharp & Step & Ratio & Viewport & Fluid & Hierarchy & Choosable & Option & Total;