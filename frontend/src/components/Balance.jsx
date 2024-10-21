import { useState } from "react";
import { Button, Modal, TextField, Box } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

export const Balance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const [balance, setBalance] = useState("");
  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://walletpay-idee.onrender.com/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.balance);
    
    } catch (err) {
      setError("Having error in fetching balance: " + err.message);
    }
  };
  useEffect(() => {
    fetchBalance();
  }, [amount]);

  const addBalance = async () => {
    try {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        console.log("Invalid amount");
        return;
      }
      const token = localStorage.getItem("token");
      await axios.post(
        "https://walletpay-idee.onrender.com/api/v1/account/add",
        { amount: parsedAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Balance added successfully");
    fetchBalance();
      console.log("added success");
    } catch (e) {
        toast.error("Something went wrong")
      console.log("failed to add");
    }
    handleClose();
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center">
        <div className="font-bold text-lg">Your balance</div>
        <div className="font-semibold ml-0 sm:ml-4 text-2xl sm:text-xl">
          Rs {Number(balance).toFixed(2)}
        </div>
        <Button
          variant="contained"
          sx={{
            marginLeft: { xs: 0, sm: "20px" },
            marginTop: { xs: "10px", sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
          className="w-full sm:w-auto mt-4 sm:mt-0"
          onClick={handleOpen}
        >
          Add balance
        </Button>
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="add-balance-modal"
        aria-describedby="modal-to-add-balance"
      >
        <Box
          className="bg-white p-6 rounded-md shadow-lg"
          sx={{
            width: { xs: "90%", sm: "400px" },
            margin: "auto",
            marginTop: "20vh",
            textAlign: "center",
          }}
        >
          <h2 id="add-balance-modal" className="mb-4">
            Add Balance
          </h2>

          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mb-4"
          />

          <Button
            variant="contained"
            onClick={addBalance}
            fullWidth
            sx={{
              marginTop: "10px",
            }}
          >
            Send
          </Button>
        </Box>
      </Modal>
    </>
  );
};
