import { useNavigate } from "@tanstack/react-router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Input } from "./ui/input";

type FormType = {
  searchQuery: string;
};

const SearchMenu: FC = () => {
  const navigate = useNavigate();
  const form = useForm<FormType>();
  const { t } = useTranslation();

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        // const searchParams = new URLSearchParams();
        // searchParams.append("search_query", String(data.searchQuery));
        // if (!data.searchQuery) return;

        navigate({
          to: "/product",
          search: { searchQuery: String(data.searchQuery) },
        });
      })}
    >
      <Input
        placeholder={t("search", "Search")}
        {...form.register("searchQuery")}
      />
    </form>
  );
};

export default SearchMenu;
