import { Request, Response } from "express";

// DB
import { connect } from '../database';

// Interfaces
import { RowDataPacket } from "mysql2";

// Helpers
// Helpers
import AuthService from "../services/auth.service";

import { UserHelper } from "../helpers/user.helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signin(req: Request, res: Response) {
  const userName = req.body.userName;
  const userPass = req.body.password;

  try {
    const authSrv = new AuthService();
    const { user, token } = await authSrv.validateUser(userName, userPass);

    res.status(200).header('auth-token', token).json({
      message: "Auth successful",
      token: user
    });

  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: 'Auth failed'
    });
  }
}

export async function signup(req: Request, res: Response) {
  const { username, displayname, password } = req.body;

  try {
    const authSrv = new AuthService();
    const userId: number = await authSrv.createUser(username, displayname, password);

    res.status(200).json({
      message: 'Operation OK',
      newUser: userId
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error in Signup'
    });
  }
}