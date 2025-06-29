    import { useState, useEffect, useCallback } from "react";
    import { Notification } from "../../domain/entities/notification";

    import { NotificationRepositoryImpl } from "../../data/repository_imple/notificationRepositoryImple";
    import { ScheduleNotificationUseCase } from "../../domain/useCases/addNotificationUseCase";
    import { CancelNotificationUseCase } from "../../domain/useCases/deleteNotificationUseCase";
    import { GetPendingNotificationsUseCase } from "../../domain/useCases/getPendingNotificationUseCase";
    import { UpdateNotificationUseCase } from "../../domain/useCases/updateNotificationUseCase";

    export const useNotificationViewModel = () => {
    const repository = new NotificationRepositoryImpl();

    const scheduleNotificationUseCase = new ScheduleNotificationUseCase(repository);
    const cancelNotificationUseCase = new CancelNotificationUseCase(repository);
    const getPendingNotificationsUseCase = new GetPendingNotificationsUseCase(repository);
    const updateNotificationUseCase = new UpdateNotificationUseCase(repository);

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNotifications = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
        const result = await getPendingNotificationsUseCase.execute();
        setNotifications(result);
        } catch (err) {
        setError("Error al cargar notificaciones");
        } finally {
        setIsLoading(false);
        }
    }, []);

    const createNotification = useCallback(
        async (notification: Omit<Notification, "id">) => {
        setIsLoading(true);
        setError(null);
        try {
            await scheduleNotificationUseCase.execute(notification);
            await fetchNotifications();
        } catch (err) {
            setError("Error al programar la notificación");
        } finally {
            setIsLoading(false);
        }
        },
        [fetchNotifications]
    );

    const updateNotification = useCallback(
        async (notification: Notification) => {
        setIsLoading(true);
        setError(null);
        try {
            await updateNotificationUseCase.execute(notification);
            await fetchNotifications();
        } catch (err) {
            setError("Error al actualizar la notificación");
        } finally {
            setIsLoading(false);
        }
        },
        [fetchNotifications]
    );

    const deleteNotification = useCallback(
        async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await cancelNotificationUseCase.execute(id);
            await fetchNotifications();
        } catch (err) {
            setError("Error al cancelar la notificación");
        } finally {
            setIsLoading(false);
        }
        },
        [fetchNotifications]
    );

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    return {
        notifications,
        isLoading,
        error,
        fetchNotifications,
        createNotification,
        updateNotification,
        deleteNotification,
    };
    };