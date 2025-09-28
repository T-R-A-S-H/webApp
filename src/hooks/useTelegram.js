import { api } from '../api';

const tg = window.Telegram.WebApp;

export function useTelegram() {

    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    const isAdmin = async () => {
        const user = tg.initDataUnsafe?.user;
        if (!user) return false;

        // Special check for @mama_brik
        if (user.username === 'mama_brik') return true;

        if (!user.username) return false;
        try {
            const admins = await api.getAdmins();
            const permissions = admins.find(a => a.username === '@' + user.username);
            return permissions !== undefined;
        } catch (error) {
            console.error('Error checking admin:', error);
            return false;
        }
    }

    const getAdminPermissions = async () => {
        const user = tg.initDataUnsafe?.user;
        if (!user || !user.username) return null;
        try {
            const admins = await api.getAdmins();
            const admin = admins.find(a => a.username === '@' + user.username);
            return admin ? admin.permissions : null;
        } catch (error) {
            console.error('Error getting permissions:', error);
            return null;
        }
    }

    const addAdmin = async (username, permissions) => {
        try {
            await api.addAdmin({ username, permissions });
        } catch (error) {
            console.error('Error adding admin:', error);
        }
    }

    const updateAdminPermissions = async (username, permissions) => {
        try {
            await api.updateAdmin(username, { permissions });
        } catch (error) {
            console.error('Error updating admin:', error);
        }
    }

    const removeAdmin = async (username) => {
        try {
            await api.deleteAdmin(username);
        } catch (error) {
            console.error('Error removing admin:', error);
        }
    }

    const getAllAdmins = async () => {
        try {
            return await api.getAdmins();
        } catch (error) {
            console.error('Error getting admins:', error);
            return [];
        }
    }

    return {
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
        isAdmin,
        getAdminPermissions,
        addAdmin,
        updateAdminPermissions,
        removeAdmin,
        getAllAdmins,
    }
}
