
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flashcard, FlashcardDocument } from './entities/flashcard.schema';
import { Model } from 'mongoose';
import { CreateFlashcardTdo } from './tdo/createflashcardTdo';
import { UserTdoResponse } from 'src/auth/tdo/userTdoResponse';
import { supermemo, SuperMemoGrade, SuperMemoItem } from 'supermemo';
import * as dayjs from 'dayjs';


interface FlashcardMemo extends SuperMemoItem {
  front: string;
  back: string;
  dueDate: string;
}

@Injectable()
export class FlashcardService {
  constructor(@InjectModel(Flashcard.name) private flashcardModel: Model<FlashcardDocument>) {

  }
  practice(flashcard: FlashcardMemo, grade: SuperMemoGrade): FlashcardMemo {
    const { interval, repetition, efactor } = supermemo(flashcard, grade);
    const dueDate = dayjs(Date.now()).add(interval, 'day').toISOString();
    return { ...flashcard, interval, repetition, efactor, dueDate };
  }
  async update(flashcardTdo: FlashcardDocument, grade: number): Promise<Flashcard> {
    const currentDate = new Date(flashcardTdo.dueDate).toISOString();
    const dat: string = currentDate
    const cardToReview: FlashcardMemo = {
      back: flashcardTdo.back,
      front: flashcardTdo.front,
      dueDate: dat,
      interval: flashcardTdo.interval,
      repetition: flashcardTdo.repetition,
      efactor: flashcardTdo.efactor,
    };

    const gradeMemo = grade as SuperMemoGrade;
    const cardReviewd = this.practice(cardToReview, gradeMemo)

    const dueDate = new Date(cardReviewd.dueDate);
    flashcardTdo.dueDate = dueDate;
    flashcardTdo.interval = cardReviewd.interval;
    flashcardTdo.repetition = cardReviewd.repetition



    const updatedFlashcard = await this.flashcardModel.findByIdAndUpdate(
      flashcardTdo.id,
      { $set: flashcardTdo },
      { new: true } // Retorna o documento atualizado
    ).exec();
    return updatedFlashcard;
  }
  async create(flashcardTdo: CreateFlashcardTdo): Promise<Flashcard> {
    const createMessage = new this.flashcardModel(flashcardTdo);
    return createMessage.save();
  }
  async getFlashcards(userId: string): Promise<Flashcard[]> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const flashcards: FlashcardDocument[] = await this.flashcardModel.find({
      userId: userId, dueDate: {
        $gte: startOfToday,
        $lt: endOfToday
      }
    }).exec()
    return flashcards
  }
  async getCountNewAndToReviewCards(userId: string): Promise<{ newCards: number, toReview: number }> {
    const currentDate = new Date().toISOString().split('T')[0]; // Data atual no formato yyyy-mm-dd
    console.clear()
    console.log(userId)
    // Busca todos os flashcards
    const flashcards: FlashcardDocument[] = await this.flashcardModel.find({ userId: userId }).exec();

    // Contagem de cartões novos
    const newCards = flashcards.filter(card => {
      const createdAt = new Date(card.createdAt).toISOString().split('T')[0];
      const dueAt = new Date(card.dueDate).toISOString().split('T')[0]; // Formata o createdAt para yyyy-mm-dd
      return createdAt === currentDate && dueAt == currentDate; // Verifica se o createdAt é igual à data atual
    }).length;

    // Contagem de cartões para revisão
    const toReview = flashcards.filter(card => {
      const dueDate = new Date(card.dueDate).toISOString().split('T')[0]; // Formata o dueDate para yyyy-mm-dd
      return dueDate <= currentDate && new Date(card.createdAt).toISOString().split('T')[0] !== currentDate; // Verifica se o dueDate é hoje ou no passado e não é novo
    }).length;

    return { newCards, toReview };
  }


}
