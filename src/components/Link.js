// src/components/Link.js
import * as React from "react";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";

const Link = React.forwardRef(function Link(props, ref) {
  const { href, ...other } = props;
  return (
    <NextLink href={href} passHref legacyBehavior>
      <MuiLink ref={ref} {...other} />
    </NextLink>
  );
});

export default Link;
