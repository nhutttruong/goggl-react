import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>

        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    </div>
  );
};
