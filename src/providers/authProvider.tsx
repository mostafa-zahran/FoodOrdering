import { createContext, PropsWithChildren, useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session: Session|null;
    loading: boolean;
    profile: any;
    isAdmin: boolean;
}
const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false
});

const AuthProvider = ({children} : PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        const fetchSession = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            if(session) {
                const {data: profile, error} = await supabase.from('profiles').select().eq('id', session.user.id).single();
                if(error) {
                    console.log('error', error);
                } else {
                    setProfile(profile);
                }
            }
            setSession(session);
            setLoading(false);
        }
        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });
     }, []);
    return (
        <AuthContext.Provider value={{session, loading, profile, isAdmin: profile?.group === 'ADMIN'}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;