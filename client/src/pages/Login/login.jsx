import React, { useState } from "react";
import { Button, Input, Card, Typography, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      navigate("/homepage");
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f0f2f5, #e6ecf3)",
        padding: "1rem",
      }}
    >
      <Card
        style={{
          width: 400,
          padding: "2.5rem 2rem",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#6A5ACD",
            width: 60,
            height: 60,
            borderRadius: "50%",
            margin: "0 auto 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LockOutlined style={{ color: "white", fontSize: 28 }} />
        </div>

        <Title level={3} style={{ marginBottom: "0.5rem" }}>
          Welcome back
        </Title>
        <Text type="secondary" style={{ fontSize: "14px" }}>
          Please sign in to continue
        </Text>

        <Input
          prefix={<UserOutlined />}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="large"
          style={{
            marginTop: "2rem",
            marginBottom: "1rem",
            borderRadius: "10px",
          }}
        />
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="large"
          style={{
            marginBottom: "1rem",
            borderRadius: "10px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <Checkbox>Remember me</Checkbox>
          <Link href="#" style={{ fontSize: "13px" }}>
            Forgot password?
          </Link>
        </div>

        <Button
          type="primary"
          block
          size="large"
          onClick={handleLogin}
          style={{
            backgroundColor: "#6A5ACD",
            borderRadius: "10px",
            fontWeight: "bold",
            height: "45px",
            fontSize: "16px",
          }}
        >
          Sign in
        </Button>

        <div style={{ marginTop: "2rem", fontSize: "14px" }}>
          Don't have an account?{" "}
          <Link href="#" style={{ fontWeight: "bold" }}>
            Create one now
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
