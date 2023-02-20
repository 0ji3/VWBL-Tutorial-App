import { useState } from 'react';
import { VwblContainer } from '../container';
import { useParams, useNavigate } from 'react-router-dom';

export const useTransferNft = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tokenId = Number(useParams().id);
  const navigate = useNavigate();
  /*  VwblContainerからvwblインスタンスを取得する */
  const {vwbl} = VwblContainer.useContainer();
  // Lesson-7
  const transferNft = async (data) => {
    if (!vwbl) {
      console.log('Now your wallet is not connected. Please connect your wallet.');
      return;
    }

    const { address } = data;
    setIsLoading(true);

    try {
      /* VWBL NFTを送信 */
      await vwbl.safeTransfer(address, tokenId);

      setIsLoading(false);
      setIsComplete(true);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Lesson-7
  const handleComplete = () => {
    setIsComplete((prev) => !prev);
    navigate('/');
  };

  return {
    isComplete,
    isLoading,
    transferNft,
    handleComplete,
  };
};
