import { FC } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autoformat,
  Bold,
  Italic,
  Underline,
  BlockQuote,
  CloudServices,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  Indent,
  IndentBlock,
  Link,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  Table,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
  Font,
  HorizontalLine,
  Highlight,
  ImageResizeEditing,
  ImageResizeHandles,
  EditorConfig,
  EventInfo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import MyCustomUploadAdapterPlugin from "@/presentation/shared/utils/CustomUploadAdapter";

const configCKEditor: EditorConfig = {
  toolbar: [
    "undo",
    "redo",
    "|",
    "heading",
    "|",
    "bold",
    "italic",
    "alignment",
    "underline",
    "highlight",
    "horizontalLine",
    "|",
    "fontSize",
    "fontFamily",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "link",
    "insertImage",
    "insertTable",
    "blockQuote",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
  ],
  plugins: [
    Autoformat,
    BlockQuote,
    Bold,
    CloudServices,
    Essentials,
    Heading,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResizeEditing,
    ImageResizeHandles,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Mention,
    Paragraph,
    PasteFromOffice,
    PictureEditing,
    Table,
    TableColumnResize,
    TableToolbar,
    TextTransformation,
    Underline,
    Font,
    HorizontalLine,
    Highlight,
  ],
  extraPlugins: [MyCustomUploadAdapterPlugin],
  image: {
    toolbar: [
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight",
      "|",
      "toggleImageCaption",
      "imageTextAlternative",
      "|",
      "linkImage",
    ],
    insert: {
      type: "auto",
    },
  },
  language: {
    ui: "en",
    content: "ar",
  },
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true,
      },
    ],
  },
};
interface IPropsCkEditor {
  config?: EditorConfig;
  data?: string;
  onChange?: (e: EventInfo, editor: ClassicEditor) => void;
  onBlur?: (e: EventInfo, editor: ClassicEditor) => void;
  OnFocus?: (e: EventInfo, editor: ClassicEditor) => void;
}

const CkEditor: FC<IPropsCkEditor> = (props) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={props.config || configCKEditor}
      {...props}
    />
  );
};

export default CkEditor;
