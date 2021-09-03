import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import io from "socket.io-client";

export const socket = io();
