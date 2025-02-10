import { Router } from 'express';
import { verifyJWT } from '../../../../VideoTube/src/middlewares/auth.middleware';
import {
    createNotification,
    getNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
    markNotificationAsRead,
    deleteOldNotifications
} from '../controllers/notification.controller';

const router = Router();

router.use(verifyJWT);

// Routes for notifications
router.route('/')
    .post(createNotification)  // Create a new notification
    .get(getNotifications);    // Get all notifications for the user

router.route('/:notificationId')
    .get(getNotificationById)   // Get a specific notification by ID
    .patch(updateNotification)  // Update notification details
    .delete(deleteNotification); // Delete a notification

// Mark a notification as read
router.route('/:notificationId/read').patch(markNotificationAsRead);

// Cleanup route: Delete old notifications (Scheduled Cleanup)
router.route('/cleanup').delete(deleteOldNotifications);

export default router;
