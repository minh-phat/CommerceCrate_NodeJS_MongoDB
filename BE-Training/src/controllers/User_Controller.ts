import { i18n } from "@/constant/I18n_Constant";
import { UserService } from "@/services/User_Service";
import { Request, Response } from "express";
import mongoose from "mongoose";

const UserController = {
	createUser: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const response = await UserService.createUser(req.body);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].USER_CREATE_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			return res.status(400).json({
				status: 400,
				message: i18n[lang].USER_CREATE_FAILED,
				error: error,
			});
		}
	},

	loginUser: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const response = await UserService.loginUser(req.body);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].USER_LOGIN_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			console.error("error", error);
			return res.status(400).json({
				status: 400,
				message: i18n[lang].USER_LOGIN_FAILED,
				error: error,
			});
		}
	},

	updateUser: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const userId = new mongoose.Types.ObjectId(req.params.id);
			const response = await UserService.updateUser(userId, req.body);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].USER_UPDATE_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			console.error("error", error);
			return res.status(400).json({
				status: 400,
				message: i18n[lang].USER_UPDATE_FAILED,
				error: error,
			});
		}
	},

	getDetailsUser: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const userId = new mongoose.Types.ObjectId(req.params.id);
			const response = await UserService.getDetailsUser(userId);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].USER_GET_DETAILS_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			console.error("error", error);
			return res.status(400).json({
				status: 400,
				message: i18n[lang].USER_GET_DETAILS_FAILED,
				error: error,
			});
		}
	},

	getAllUser: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		req.acceptsLanguages();
		try {
			const { limit, page, filter } = req.query;

			let parsedFilter: [string, string] | null = null;
			if (filter && typeof filter === "string") {
				const filterParts = filter.split(",");
				if (filterParts.length === 2) {
					parsedFilter = [filterParts[0], filterParts[1]];
				}
			}

			const response = await UserService.getAllUser(
				Number(limit),
				Number(page),
				parsedFilter
			);

			if (response) {
				const plainData = response.data.map((user: any) =>
					user.toObject ? user.toObject() : user
				);

				return res.status(200).json({
					status: 200,
					message: i18n[lang].USER_GET_ALL_SUCCESS,
					data: plainData,
					totals: response.totals,
					page: response.page,
					totalPage: response.totalPage,
				});
			}
		} catch (error) {
			return res.status(400).json({
				status: 400,
				message: i18n[lang].USER_GET_ALL_FAILED,
				error: error,
			});
		}
	},

	deleteUser: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			const userId = new mongoose.Types.ObjectId(req.params.id);
			const response = await UserService.deleteUser(userId);
			if (response) {
				return res.status(200).json({
					status: 200,
					message: i18n[lang].USER_DELETE_SUCCESS,
					data: response,
				});
			}
		} catch (error) {
			console.error("error", error);
			return res.status(400).json({
				status: 400,
				message: i18n[lang].USER_DELETE_FAILED,
				error: error,
			});
		}
	},

	logoutUser: async (req: Request, res: Response) => {
		const lang = req.headers["accept-language"] ?? "en";
		try {
			res.clearCookie("refresh_token");
			return res.status(200).json({
				status: 200,
				message: i18n[lang].USER_LOGOUT_SUCCESS,
			});
		} catch (error) {
			return res.status(400).json({
				status: 400,
				message: i18n[lang].USER_LOGOUT_FAILED,
				error: error,
			});
		}
	},
};

export { UserController };
