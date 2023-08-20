import React from "react";
import style from "./style.module.scss";
import axios from "axios";

export default function Navbar() {
  const [bot, setBot] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://localhost:8080/api/users/@me").then(({ data }) => {
      setBot(data);
    });
  }, []);

  return <nav className={style.navbar}>
    {bot !== null && <div className={style.botInfo}>
      <img
        src={`https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.webp?size=64`}
        alt="Tiny Games avatar, Tiny Games icon"
        className={style.botIcon}
      />
      <h1 className={style.botName}>{bot.username}</h1>
    </div>}
  </nav>
}