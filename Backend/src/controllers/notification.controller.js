import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/** 
 * @desc Create a new notification
 * @route POST /notifications
 * @access Private
 */
const createNotification = asyncHandler(async (req, res) => {
    const { message, status = "unread", type } = req.body;
    const userId = req.user._id; // Assuming user is authenticated

    if (!message || !type) {
        throw new ApiError(400, "Message and type are required");
    }

    const notification = await Notification.create({ user: userId, message, status, type });

    res.status(201).json(new ApiResponse(201, notification, "Notification created successfully"));
});
/** 
 * @desc Get all notifications for a user
 * @route GET /notifications
 * @access Private
 */
const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, notifications, "Notifications fetched successfully"));
});
/** 
 * @desc Get a single notification by ID
 * @route GET /notifications/:notificationId
 * @access Private
 */
const getNotificationById = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOne({ _id: notificationId, user: userId });

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    res.status(200).json(new ApiResponse(200, notification, "Notification fetched successfully"));
});

const updateNotification = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const { message, status, type } = req.body;
    const userId = req.user._id; // Assuming user authentication middleware

    // Find the notification and ensure it belongs to the user
    const notification = await Notification.findOne({ _id: notificationId, user: userId });

    if (!notification) {
        throw new ApiError(404, "Notification not found or not authorized to update");
    }

    // Update the notification fields if provided
    if (message) notification.message = message;
    if (status) notification.status = status;
    if (type) notification.type = type;

    await notification.save();

    res.status(200).json(new ApiResponse(200, notification, "Notification updated successfully"));
});



/** 
 * @desc Mark a notification as read
 * @route PATCH /notifications/:notificationId/read
 * @access Private
 */
const markAsRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, user: userId },
        { status: "read" },
        { new: true, runValidators: true }
    );

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    res.status(200).json(new ApiResponse(200, notification, "Notification marked as read"));
});

/** 
 * @desc Delete a notification
 * @route DELETE /notifications/:notificationId
 * @access Private
 */
const deleteNotification = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOneAndDelete({ _id: notificationId, user: userId });

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Notification deleted successfully"));
});


// Not understood
import cron from "node-cron";

const cleanOldNotifications = async () => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30); // 30 days ago

    await Notification.deleteMany({ createdAt: { $lt: cutoffDate } });

    console.log("✅ Old notifications cleaned up.");
};

// Schedule cleanup to run every day at midnight
cron.schedule("0 0 * * *", cleanOldNotifications);


export { deleteNotification };

export { markAsRead };


export { getNotificationById };


export { getNotifications };


export { createNotification };

export { updateNotification };
    
