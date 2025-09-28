import { db } from '../db';

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

    const isAdmin = () => {
        const user = tg.initDataUnsafe?.user;
        if (!user) return false;

        // Special check for @mama_brik
        if (user.username === 'mama_brik') return true;

        if (!user.username) return false;
        const permissions = db.getAdminPermissions('@' + user.username);
        return permissions !== null;
    }

    const getAdminPermissions = () => {
        const user = tg.initDataUnsafe?.user;
        if (!user || !user.username) return null;
        return db.getAdminPermissions('@' + user.username);
    }

    const addAdmin = (username, permissions) => {
        db.addAdmin(username, permissions);
    }

    const updateAdminPermissions = (username, permissions) => {
        db.updateAdminPermissions(username, permissions);
    }

    const removeAdmin = (username) => {
        db.removeAdmin(username);
    }

    const getAllAdmins = () => {
        return db.getAdmins();
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
