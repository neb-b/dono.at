import NextHead from "next/head";
// import styleSheet from "styled-components/lib/models/StyleSheet";

const Head = (props) => {
  if (!process.env.browser) {
    let styles = (
      <style>
        {styleSheet
          .rules()
          .map((rule) => rule.cssText)
          .join("\n")}
      </style>
    );
    props.children = props.children || [];
    props.children.push(styles);
  }
  return <NextHead {...props} />;
};

export default Head;
