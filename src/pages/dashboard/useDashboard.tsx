import { useCallback, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import ValueService from "../../services/ValueService";
import { api } from "../../services/api";
import { IGetFinances } from "../../interfaces/values";

export const useDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState(0);
  const [expends, setExpends] = useState(0);
  const [total, setTotal] = useState("0");
  const [finances, setFinances] = useState<IGetFinances[]>([]);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const reloadPage = () => {
    window.location.reload();
  };

  const handleAdd = async (data: any) => {
    setLoading(true);
    try {
      await new ValueService().valueRegister(data);
      setLoading(false);
      alert("O valor foi cadastrado com sucesso");
      reloadPage();
    } catch (err) {
      alert("Erro ao cadastrar o valor");
    }
  };

  const loadFinancials = useCallback(async () => {
    const response = await new ValueService().get();

    const financialEntries = response
      .filter((financial) => !financial.expend)
      .map((financial) => financial.value);

    const entries = financialEntries
      .reduce((acc, number) => acc + number, 0)
      .toFixed(2);

    const financialExpends = response
      .filter((financial) => financial.expend)
      .map((financial) => financial.value);

    const expends = financialExpends
      .reduce((acc, number) => acc + number, 0)
      .toFixed(2);

    console.log(entries);

    const total = Math.abs(Number(entries) - Number(expends));

    console.log(total);

    setEntries(Number(entries));
    setExpends(Number(expends));
    setTotal(`${Number(entries) < Number(expends) ? "-" : ""} ${total}`);
    setFinances(response);
  }, []);

  const handleDelete = async (row: any) => {
    await new ValueService().delete(row.id);
    alert("O valor foi excluído com sucesso");
    reloadPage();
  };

  useEffect(() => {
    loadFinancials();
  }, [loadFinancials]);

  return {
    loading,
    entries,
    expends,
    total,
    finances,
    register,
    errors,
    handleSubmit,
    handleAdd,
    handleDelete,
    watch,
  };
};
