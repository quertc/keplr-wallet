import React, { FunctionComponent, useState } from "react";
import { RegisterSceneBox } from "../components/register-scene-box";
import { FormNamePassword, useFormNamePassword } from "../components/form";
import { useRegisterHeader } from "../components/header";
import {
  useSceneEvents,
  useSceneTransition,
} from "../../../components/transition";
import { Columns } from "../../../components/column";
import { Subtitle3 } from "../../../components/typography";
import { Toggle } from "../../../components/toggle";
import { ColorPalette } from "../../../styles";
import { useBIP44PathState } from "../components/bip-44-path";
import { Gutter } from "../../../components/gutter";
import { observer } from "mobx-react-lite";
import { useIntl } from "react-intl";
import { Dropdown } from "../../../components/dropdown";
import { Label, TextInput } from "../../../components/input";

export const RegisterNamePasswordHardwareScene: FunctionComponent<{
  type: string;
}> = observer(({ type }) => {
  const sceneTransition = useSceneTransition();
  const intl = useIntl();

  const header = useRegisterHeader();
  useSceneEvents({
    onWillVisible: () => {
      header.setHeader({
        mode: "step",
        title: intl.formatMessage({
          id: "pages.register.name-password-hardware.title",
        }),
        stepCurrent: 1,
        stepTotal: type === "keystone" ? 4 : 3,
      });
    },
  });

  const form = useFormNamePassword();

  const [connectTo, setConnectTo] = useState<string>("Cosmos");
  const [authKeyIdView, setAuthKeyIdView] = useState<string>("");
  const [authKeyIdSign, setAuthKeyIdSign] = useState<string>("");
  const [authKeyViewPassword, setAuthKeyViewPassword] = useState<string>("");
  const [objectId, setObjectId] = useState<string>("");
  const [isSameAuthKey, setIsSameAuthKey] = useState<boolean>(true);

  const handleToggleChange = (isOpen: boolean) => {
    setIsSameAuthKey(isOpen);
    if (isOpen) {
      setAuthKeyIdSign(authKeyIdView);
    }
  };

  const handleAuthKeyIdViewChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAuthKeyIdView(e.target.value);
    if (isSameAuthKey) {
      setAuthKeyIdSign(e.target.value);
    }
  };

  const handleAuthKeyIdSignChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isSameAuthKey) {
      setAuthKeyIdSign(e.target.value);
    }
  };

  const bip44PathState = useBIP44PathState();

  return (
    <RegisterSceneBox>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (type === "ledger") {
            sceneTransition.push("connect-ledger", {
              name: data.name,
              password: data.password,
              app: connectTo,
              authKeyIdView,
              authKeyIdSign,
              authKeyViewPassword,
              objectId,
              bip44Path: bip44PathState.getPath(),
              stepPrevious: 1,
              stepTotal: 3,
            });
          } else if (type === "keystone") {
            sceneTransition.push("connect-keystone", {
              name: data.name,
              password: data.password,
              stepPrevious: 1,
              stepTotal: 4,
            });
          } else {
            throw new Error(`Invalid type: ${type}`);
          }
        })}
      >
        <FormNamePassword {...form} autoFocus={true}>
          {type === "ledger" ? (
            <React.Fragment>
              <Gutter size="1rem" />
              <Label
                content={intl.formatMessage({
                  id: "pages.register.name-password-hardware.connect-to",
                })}
              />
              <Dropdown
                color="text-input"
                size="large"
                selectedItemKey={connectTo}
                items={[
                  {
                    key: "Cosmos",
                    label: intl.formatMessage({
                      id: "pages.register.name-password-hardware.connect-to-cosmos",
                    }),
                  },
                  {
                    key: "Terra",
                    label: intl.formatMessage({
                      id: "pages.register.name-password-hardware.connect-to-terra",
                    }),
                  },
                  {
                    key: "Secret",
                    label: intl.formatMessage({
                      id: "pages.register.name-password-hardware.connect-to-secret",
                    }),
                  },
                ]}
                onSelect={(key) => {
                  setConnectTo(key);
                }}
              />
              <Gutter size="1rem" />
              <TextInput
                label="Auth Key ID for view accounts"
                value={authKeyIdView}
                onChange={handleAuthKeyIdViewChange}
              />
              <Gutter size="1rem" />
              <TextInput
                label="Password for this View Auth Key"
                type="password"
                value={authKeyViewPassword}
                onChange={(e) => setAuthKeyViewPassword(e.target.value)}
              />
              <Gutter size="1rem" />
              {isSameAuthKey ? null : (
                <React.Fragment>
                  <TextInput
                    label="Auth Key ID for sign (w/o password)"
                    value={authKeyIdSign}
                    onChange={handleAuthKeyIdSignChange}
                  />
                  <Gutter size="1rem" />
                </React.Fragment>
              )}
              <TextInput
                label="Object ID"
                value={objectId}
                onChange={(e) => setObjectId(e.target.value)}
              />
              <Gutter size="1rem" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Columns sum={1} gutter="0.5rem" alignY="center">
                  <Subtitle3 color={ColorPalette["gray-200"]}>
                    Same auth key for sign
                  </Subtitle3>
                  <Toggle
                    isOpen={isSameAuthKey}
                    setIsOpen={handleToggleChange}
                  />
                </Columns>
              </div>
              <Gutter size="1.625rem" />
            </React.Fragment>
          ) : undefined}
        </FormNamePassword>
      </form>
    </RegisterSceneBox>
  );
});
