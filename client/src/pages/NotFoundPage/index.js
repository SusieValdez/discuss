import { React } from "react";
import { Container } from "./NotFoundPage.styles";
import NotFoundBackground from "../../assets/notFoundBackground.png";

const NotFoundPage = () => {
  return (
    <Container background={NotFoundBackground}>
      <h1>Sorry! We could not find that page.</h1>
    </Container>
  );
};

export default NotFoundPage;
