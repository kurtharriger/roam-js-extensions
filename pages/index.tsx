import React from "react";
import Head from "next/head";
import { AppBar, Logo } from "@dvargas92495/ui";

const RoamJSLogo = ({ size }: { size: number }) => (
  <Logo size={size} viewBoxWidth={1400}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M325 300C380.228 300 425 255.228 425 200C425 144.772 380.228 100 325 100C269.772 100 225 144.772 225 200C225 255.228 269.772 300 325 300ZM325 250C352.614 250 375 227.614 375 200C375 172.386 352.614 150 325 150C297.386 150 275 172.386 275 200C275 227.614 297.386 250 325 250Z"
      fill="#333333"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M900 133.854C881.676 113.094 854.867 100 825 100C769.772 100 725 144.772 725 200V300H775V200C775 172.386 797.386 150 825 150C852.614 150 875 172.386 875 200V300H925V200C925 172.386 947.386 150 975 150C1002.61 150 1025 172.386 1025 200V300H1075V200C1075 144.772 1030.23 100 975 100C945.133 100 918.324 113.094 900 133.854Z"
      fill="#333333"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M100 100C155.228 100 200 144.772 200 200H150C150 172.386 127.614 150 100 150C72.3858 150 50 172.386 50 200V300H0V200C0 144.772 44.7715 100 100 100Z"
      fill="#F7941D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M550 300C605.228 300 650 255.228 650 200C650 144.772 605.228 100 550 100C494.772 100 450 144.772 450 200C450 255.228 494.772 300 550 300ZM550 250C577.614 250 600 227.614 600 200C600 172.386 577.614 150 550 150C522.386 150 500 172.386 500 200C500 227.614 522.386 250 550 250Z"
      fill="#3BA4DC"
    />
    <rect x="650" y="100" width="50" height="200" fill="#F7941D" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1300 200C1300 144.772 1344.77 100 1400 100V150C1372.39 150 1350 172.386 1350 200C1350 255.228 1305.23 300 1250 300V250C1277.61 250 1300 227.614 1300 200Z"
      fill="#F7941D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1225 25C1225 38.8071 1213.81 50 1200 50C1186.19 50 1175 38.8071 1175 25C1175 11.1929 1186.19 0 1200 0C1213.81 0 1225 11.1929 1225 25ZM1175 100V200C1175 227.614 1152.61 250 1125 250V300C1180.23 300 1225 255.228 1225 200V100H1175Z"
      fill="#3BA4DC"
    />
  </Logo>
);

const HomePage = () => (
  <div>
    <Head>
      <title>Roam JS</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <AppBar homeIcon={<RoamJSLogo size={2} />} pages={["about", "docs"]} />
    <main
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>
        <RoamJSLogo size={20} />
      </h1>
      <h4>
        <i>Extensions That Turn You Into A Roam Super User</i>
      </h4>
    </main>
    <footer>
      <hr />
      <span>© {new Date().getFullYear()} Vargas Arts, LLC</span>
    </footer>
  </div>
);

export default HomePage;
