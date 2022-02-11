import React from "react";
// Styles
import { Content, UserBanList, MemberRow, MemberDetails } from "./Bans.styles";

const Bans = (users) => {
  return (
    <Content>
      <h1>1 Ban</h1>
      <UserBanList>
        <div>
          <div className="line-break" />
          <MemberRow>
            <MemberDetails>
              <img
                src="https://64.media.tumblr.com/513168613b9648da4ff6e6e0c37de162/080fc14f87b86f09-fa/s640x960/b8eeb3457963a6dc11a1e679147136ebb1d377dc.png"
                alt="user avatar"
              />
              <div>
                <h2>Togepi</h2>
              </div>
            </MemberDetails>
          </MemberRow>
          <div className="line-break" />
        </div>
      </UserBanList>
    </Content>
  );
};

export default Bans;
