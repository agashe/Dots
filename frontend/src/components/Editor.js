import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useColorMode } from "@chakra-ui/react";

export function Editor({ value, handler, height, placeholder }) {
  const { colorMode, } = useColorMode();

  if (colorMode === 'dark') {
    document.querySelectorAll('.ql-toolbar').forEach((toolbar) => {
      toolbar.style.backgroundColor = 'white';
    });
  }

  let modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"], // "image"
      ["clean"],
    ],
  };

  let formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    // "image",
  ];

  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={handler}
      modules={modules}
      formats={formats}
      style={{ height: height, color: 'white' }}
      placeholder={placeholder ?? ""}
    />
  );
}
