import { useCallback, useEffect, useRef } from "react";
import { networkActions } from "../store/network.store";
import type { NetworkInitialStateProps } from "../store/network.types";

export interface UseNetworkDetectionProps {
  isNetwork: boolean;
  getStatus?: (payload: NetworkInitialStateProps["infoNetwork"]) => void;
}

export const useNetworkDetection = (props: UseNetworkDetectionProps) => {
  const { isNetwork, getStatus } = props;
  const colnfigRef = useRef({ excludeFirstInit: false });
  /*############------------<{ Effects }>------------############ */
  useEffect(() => {
    if (!isNetwork && isNetwork !== null) {
      const payload = { online: "", offline: "active", status: isNetwork, action: "offline", titleOffline: `Нет доступа к сети` };
      resetClassActiveWithDuration("offline", payload);
      colnfigRef.current.excludeFirstInit = true;
      return;
    }

    if (colnfigRef.current.excludeFirstInit && isNetwork !== null) {
      const payload = { online: "active", offline: "", status: isNetwork, action: "online", titleOnline: "В сети" };
      resetClassActiveWithDuration("online", payload);
      return;
    }
  }, [isNetwork]);

  /*############------------<{ Helpers }>------------############ */

  const setInfo = useCallback(
    (payload: NetworkInitialStateProps["infoNetwork"]) => {
      networkActions.setInfoNetworkStatus({ infoNetwork: payload });
      typeof getStatus === "function" && getStatus(payload);
    },
    [getStatus],
  );

  const resetClassActiveWithDuration = useCallback(
    (keyActive: string, payload) => {
      console.log("payload network: ", payload);
      // setStateHelpers(payload)
      setInfo(payload);
      if (!isNetwork && keyActive === "offline") {
        return;
      }
      const idTimeout = setTimeout(() => {
        console.dir("setTimeout OfflineDetection");
        const resetPayload = { [keyActive]: "" };
        keyActive === "online" && (resetPayload.action = "");

        // setStateHelpers(resetPayload)
        const payload: NetworkInitialStateProps["infoNetwork"] = { offline: "", online: "", status: isNetwork, action: "", titleOnline: "", titleOffline: "" };
        setInfo(payload);
        clearTimeout(idTimeout);
      }, 3000);
    },
    [isNetwork, setInfo],
  );
};
