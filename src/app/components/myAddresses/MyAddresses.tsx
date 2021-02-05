import React from "react";
import BitcoinLogo from "./bitcoin.png";
import EthereumLogo from "./ethereum.png";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function MyAddresses() {
  const bitcoinRef = React.useRef<HTMLTextAreaElement>(null);
  const ethereumRef = React.useRef<HTMLTextAreaElement>(null);

  function copyEthereumToClipboard(e: any) {
    ethereumRef?.current?.select();
    document.execCommand("copy");
    e?.target?.focus();
  }

  function copyBitcoinToClipboard(e: any) {
    bitcoinRef?.current?.select();
    document.execCommand("copy");
    e?.target?.focus();
  }

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h4" component="h4">
        <FormattedMessage id="my_addresses" />
      </Typography>
      <CryptoList>
        <CryptoItem>
          <Typography gutterBottom variant="h5" component="h5">
            Bitcoin
          </Typography>
          <CryptoLogo alt="Bitcoin Logo " src={BitcoinLogo} />
          <CryptoAddress
            ref={bitcoinRef}
            value={"3NFJDDTuZXEv2tpkAiuESVwwgmL837gGAE"}
            readOnly={true}
          />
          <div>
            {document.queryCommandSupported &&
              document.queryCommandSupported("copy") && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => copyBitcoinToClipboard(e)}
                >
                  <FormattedMessage id="donate_copy_wallet" />
                </Button>
              )}
          </div>
        </CryptoItem>
        <CryptoItem>
          <Typography gutterBottom variant="h5" component="h5">
            Ethereum
          </Typography>
          <CryptoLogo alt="Ethereum Logo " src={EthereumLogo} />
          <CryptoAddress
            ref={ethereumRef}
            value={"0x26eBD102Ac70B2236cd4ec24B5f95B147C71293B"}
            readOnly={true}
          />
          <div>
            {document.queryCommandSupported &&
              document.queryCommandSupported("copy") && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => copyEthereumToClipboard(e)}
                >
                  <FormattedMessage id="donate_copy_wallet" />
                </Button>
              )}
          </div>
        </CryptoItem>
      </CryptoList>
    </React.Fragment>
  );
}

const CryptoList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  justify-content: center;
`;

const CryptoItem = styled.li`
  text-align: center;
  margin-bottom: 24px;
`;

const CryptoLogo = styled.img`
  height: 100px;
  display: block;
  margin: 0 auto;
`;

const CryptoAddress = styled.textarea`
  background-color: black;
  color: white;
  max-width: 280px;
  text-align: center;
  margin: 20px;
  resize: none;
`;
