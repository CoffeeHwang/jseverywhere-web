import { createGlobalStyle } from "styled-components";
import normalize from 'normalize.css';

// CSS를 JS 템플릿 리터럴로 작성 가능
export default createGlobalStyle`
${normalize}

*, *:before, *:after {
  box-sizing: border-box;
}

body,
html {
  height: 100%,
  margin: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  background-color: #fff;
  line-height: 1.4;
}

a:link, 
a:visited {
  color: #004499;
}

code,
pre {
  max-width: 100%;
}
`;