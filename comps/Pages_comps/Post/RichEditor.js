// tiptap imports
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Link from "@tiptap/extension-link";
import History from "@tiptap/extension-history";
import HardBreak from "@tiptap/extension-hard-break";

// reactjs imports
import { useCallback } from "react";

// compos imports
import FooterBtn from "../../utils/utils_comp/FooterBtn";

// styles imports
import styles from "../../../styles/comps/Page_Post/RichEditor.module.css";

// function for validating link
function isValidate(href, config) {
  const linkRegex = /https:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  const emailRegex = /[\w-]+@([\w-]+\.)+[\w-]+/;

  const valid = linkRegex.test(href) || emailRegex.test(href);
  if (config) {
    return valid;
  }

  return {
    valid,
    pre: emailRegex.test(href) ? `mailto:` : ``,
  };
}

// menubar jsx
const MenuBar = ({ editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // validity
    const { valid, pre } = isValidate(url, false);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "" || !valid) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    if (valid) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: `${pre}${url}` })
        .run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`d-flex flex-wrap bg-secondary bg-opacity-50 mb-3`}>
      <button
        title="Bold (Ctrl/Cmd + B)"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`btn btn-sm border-0 rounded-0 ${
          editor.isActive("bold")
            ? "btn-dark border border-light"
            : "btn-outline-light"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          fill="currentColor"
          width={20}
          height={20}
          className={`${styles.editorIcons}`}
        >
          <path d="M32 32C14.3 32 0 46.3 0 64V256 448c0 17.7 14.3 32 32 32H192c70.7 0 128-57.3 128-128c0-46.5-24.8-87.3-62-109.7c18.7-22.3 30-51 30-82.3c0-70.7-57.3-128-128-128H32zM160 224H64V96h96c35.3 0 64 28.7 64 64s-28.7 64-64 64zM64 288h96 32c35.3 0 64 28.7 64 64s-28.7 64-64 64H64V288z" />
        </svg>
      </button>
      <button
        title="Italic(Ctrl/Cmd + I)"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`btn btn-sm border-0 rounded-0 ${
          editor.isActive("italic")
            ? "btn-dark border border-light"
            : "btn-outline-light"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          fill="currentColor"
          width={20}
          height={20}
          className={`${styles.editorIcons}`}
        >
          <path d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z" />
        </svg>
      </button>
      <button
        title="Strike(Ctrl/Cmd + Shift + X)"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`btn btn-sm border-0 rounded-0 ${
          editor.isActive("strike")
            ? "btn-dark border border-light"
            : "btn-outline-light"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          width={20}
          height={20}
          className={`${styles.editorIcons}`}
        >
          <path d="M161.3 144c3.2-17.2 14-30.1 33.7-38.6c21.1-9 51.8-12.3 88.6-6.5c11.9 1.9 48.8 9.1 60.1 12c17.1 4.5 34.6-5.6 39.2-22.7s-5.6-34.6-22.7-39.2c-14.3-3.8-53.6-11.4-66.6-13.4c-44.7-7-88.3-4.2-123.7 10.9c-36.5 15.6-64.4 44.8-71.8 87.3c-.1 .6-.2 1.1-.2 1.7c-2.8 23.9 .5 45.6 10.1 64.6c4.5 9 10.2 16.9 16.7 23.9H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H270.1c-.1 0-.3-.1-.4-.1l-1.1-.3c-36-10.8-65.2-19.6-85.2-33.1c-9.3-6.3-15-12.6-18.2-19.1c-3.1-6.1-5.2-14.6-3.8-27.4zM348.9 337.2c2.7 6.5 4.4 15.8 1.9 30.1c-3 17.6-13.8 30.8-33.9 39.4c-21.1 9-51.7 12.3-88.5 6.5c-18-2.9-49.1-13.5-74.4-22.1c-5.6-1.9-11-3.7-15.9-5.4c-16.8-5.6-34.9 3.5-40.5 20.3s3.5 34.9 20.3 40.5c3.6 1.2 7.9 2.7 12.7 4.3l0 0 0 0c24.9 8.5 63.6 21.7 87.6 25.6l0 0 .2 0c44.7 7 88.3 4.2 123.7-10.9c36.5-15.6 64.4-44.8 71.8-87.3c3.6-21 2.7-40.4-3.1-58.1H335.1c7 5.6 11.4 11.2 13.9 17.2z" />
        </svg>
      </button>
      <button
        title="Heading(Ctrl/Cmd + Alt + 4)"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`btn btn-sm border-0 rounded-0 ${
          editor.isActive("heading", { level: 4 })
            ? "btn-dark border border-light"
            : "btn-outline-light"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
          width={20}
          height={20}
          className={`${styles.editorIcons}`}
        >
          <path d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z" />
        </svg>
      </button>
      <button
        title="Bullet List(Ctrl/Cmd + Shift + 8)"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={`btn btn-sm border-0 rounded-0 ${
          editor.isActive("bulletList")
            ? "btn-dark border border-light"
            : "btn-outline-light"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          width={20}
          height={20}
          className={`${styles.editorIcons}`}
        >
          <path d="M64 144c26.5 0 48-21.5 48-48s-21.5-48-48-48S16 69.5 16 96s21.5 48 48 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm48-208c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z" />
        </svg>
      </button>
      <button
        title="Link"
        onClick={setLink}
        disabled={!editor.can().chain().focus().setLink().run()}
        className={`btn btn-sm border-0 rounded-0 ${
          editor.isActive("link")
            ? "btn-dark border border-light"
            : "btn-outline-light"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          fill="currentColor"
          width={20}
          height={20}
          className={`${styles.editorIcons}`}
        >
          <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
        </svg>
      </button>
      <button
        title="Code (Ctrl/Cmd + E)"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`btn btn-sm border-0 rounded-0 ${
          editor.isActive("code")
            ? "btn-dark border border-light"
            : "btn-outline-light"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          fill="currentColor"
          width={20}
          height={20}
          className={`${styles.editorIcons}`}
        >
          <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
        </svg>
      </button>
      <button
        title="Code Block(Ctrl/Cmd + Alt + C)"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        className={`btn btn-sm border-0 rounded-0 ${
          editor.isActive("codeBlock")
            ? "btn-dark border border-light"
            : "btn-outline-light"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          fill="currentColor"
          width={20}
          height={20}
          className={`${styles.editorIcons}`}
        >
          <path d="M64 96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V352H512V96H128V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8H76.8C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
        </svg>
      </button>
    </div>
  );
};

export default function RichEditor({ post, children, onClose }) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Italic,
      Bold,
      Strike,
      Code,
      CodeBlock,
      Heading.configure({ levels: [4] }),
      ListItem,
      BulletList,
      Link.configure({
        openOnClick: false,
        validate: (href) => isValidate(href, true),
      }),
      History,
      HardBreak,
    ],
  });

  return (
    <>
      <div
        className={`d-flex flex-column border border-secondary overflow-hidden mb-4 rounded-1 ${
          post ? `flex-grow-1` : ``
        }`}
      >
        <MenuBar editor={editor} />
        <EditorContent
          className={`flex-grow-1 px-3 overflow-auto ${styles.mirrorWrapper} ${
            post ? styles.post : ``
          }`}
          editor={editor}
        />
      </div>
      {children ? children : ``}
      <FooterBtn variant={post ? `Post` : `Comment`} onClose={onClose} />
    </>
  );
}
