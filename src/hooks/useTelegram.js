const tg = window.Telegram.WebApp;

const ADMINS_KEY = 'telegram_admins';

function getAdmins() {
    const admins = localStorage.getItem(ADMINS_KEY);
    if (!admins) {
        const initialAdmins = ['@mama_brik'];
        localStorage.setItem(ADMINS_KEY, JSON.stringify(initialAdmins));
        return initialAdmins;
    }
    return JSON.parse(admins);
}

function addAdmin(username) {
    const admins = getAdmins();
    if (!admins.includes(username)) {
        admins.push(username);
        localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
    }
}

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
        if (!user || !user.username) return false;
        const admins = getAdmins();
        return admins.includes('@' + user.username);
    }

    return {
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
        isAdmin,
        addAdmin,
    }
}
