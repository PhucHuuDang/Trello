"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const OrgControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  console.log("params.organizationId: ", params.organizationId);

  useEffect(() => {
    if (!setActive) {
      return;
    }

    setActive({
      organization: params.organizationId as string, // make sure we get right params like folder dynamic route like this [organizationId]
    });
  }, [setActive, params.organizationId]);

  return null;
};
