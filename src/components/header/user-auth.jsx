import { Button, Drawer, Flex, Form, Input, Radio } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegUser, FaUser } from "react-icons/fa6";

const UserAuth = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isregister, setIsregister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setIsregister(false);
    setIsLogin(false);
  };
  return (
    <div>
      {open ? (
        <FaUser cursor={"pointer"} size={21} />
      ) : (
        <FaRegUser cursor={"pointer"} onClick={showDrawer} size={21} />
      )}

      <Drawer
        // title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        width={464}
        height={70}
        maskClosable={false}
        mask={false}
        styles={{
          body: { height: "700px", background: "white" },
          wrapper: { height: 700, marginTop: "83px" },
        }}
        placement="right"
      >
        <Flex
          vertical
          gap={24}
          style={{ display: isregister || isLogin ? "none" : "flex" }}
        >
          <h1 className="text-2xl font-normal text-center text-primary font-tenor">
            {t("header.profile")}
          </h1>
          <p className="font-tenor text-center text-sm text-[#444] max-w-[300px] mx-auto text-wrap leading-[150%] mb-5">
            {t("header.desc")}
          </p>
          <Flex vertical gap={20} className="">
            <Button
              className="!font-tenor"
              type="primary"
              style={{ height: 48 }}
              block
              children={t("header.login")}
              onClick={() => {
                setIsLogin(true);
                setIsregister(false);
              }}
            />
            <Button
              className="!font-tenor"
              type="default"
              style={{ height: 48 }}
              block
              children={t("header.register.title")}
              onClick={() => setIsregister(true)}
            />
          </Flex>
        </Flex>

        {isregister && (
          <Flex vertical gap={24} className="mt-5">
            <h1 className="text-2xl font-normal text-center text-primary font-tenor">
              {t("header.register.title")}
            </h1>
            <Form
              onFinish={(values) => {
                console.log(values);
              }}
              layout="vertical"
              className="w-full"
            >
              <Form.Item name="fullName">
                <Input
                  className="h-12"
                  placeholder={t("header.register.name")}
                  style={{ borderRadius: 0 }}
                />
              </Form.Item>
              <Form.Item name="phoneNumber">
                <Input
                  className="h-12"
                  placeholder={t("header.register.phone")}
                  style={{ borderRadius: 0 }}
                />
              </Form.Item>
              <Form.Item name="name">
                <Input
                  className="h-12"
                  type="date"
                  placeholder={t("header.register.dateOfBirth")}
                  style={{ borderRadius: 0 }}
                />
              </Form.Item>
              <Form.Item name="password">
                <Input
                  placeholder={t("header.register.password")}
                  className="h-12"
                  style={{ borderRadius: 0 }}
                />
              </Form.Item>

              <p className="text-xs font-tenor font-normal text-secondary mb-10">
                {t("header.register.passwordWarning")}
              </p>
              <Form.Item name={"gender"}>
                <Radio.Group defaultValue={"female"}>
                  <Radio value="male">{t("header.register.male")}</Radio>
                  <Radio value="female">{t("header.register.female")}</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Button
                  className="!font-tenor"
                  type="primary"
                  style={{ height: 48 }}
                  block
                  htmlType="submit"
                  children={t("header.register.title")}
                />
              </Form.Item>
            </Form>
          </Flex>
        )}

        {isLogin && (
          <Flex vertical gap={24} className="mt-5">
            <h1 className="text-2xl font-normal text-center text-primary font-tenor">
              {t("header.login")}
            </h1>
            <Form
              onFinish={(values) => {
                console.log(values);
              }}
              layout="vertical"
              className="w-full"
            >
              <Form.Item name="phoneNumber">
                <Input
                  className="h-12"
                  placeholder={t("header.register.phone")}
                  style={{ borderRadius: 0 }}
                />
              </Form.Item>
              <Form.Item name="password">
                <Input
                  placeholder={t("header.register.password")}
                  className="h-12"
                  style={{ borderRadius: 0 }}
                />
              </Form.Item>
              <p className="text-xs font-tenor font-normal text-primary mb-10 underline cursor-pointer">
                {t("header.register.forgotPassword")}
              </p>
              <Form.Item>
                <Button
                  className="!font-tenor"
                  type="primary"
                  style={{ height: 48 }}
                  block
                  htmlType="submit"
                  children={t("header.login")}
                />
              </Form.Item>
            </Form>
          </Flex>
        )}
      </Drawer>
    </div>
  );
};

export default UserAuth;
