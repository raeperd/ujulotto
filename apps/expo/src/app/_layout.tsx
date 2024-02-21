import React from "react";
import { Tabs } from "expo-router/tabs";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <TRPCProvider>
      {/*
          The Stack component displays the current page.
          i
          It also allows you to configure your screens 
        */}
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            display: route.name === "selfPick" ? "none" : "flex",
            position: "absolute",
            height: 70,
            paddingTop: 16,
            paddingBottom: 20,
            borderTopWidth: 0,
            backgroundColor: "#000000",
            opacity: 0.6,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "500",
            textAlign: "center",
          },
          tabBarActiveTintColor: "#FFFFFF",
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "홈",
          }}
        />
        <Tabs.Screen
          name="numbers"
          options={{
            tabBarLabel: "번호저장함",
          }}
        />
        <Tabs.Screen
          name="locations"
          options={{
            tabBarLabel: "판매점찾기",
          }}
        />
        <Tabs.Screen
          name="generates/[mode]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="selfPick"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </TRPCProvider>
  );
}
