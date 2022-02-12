import { pushToDBArray, deleteItemFromDBArray, countDBArray, serializeArray } from './../helpers/db';
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Movie } from "../entity/movie.entity";




export const AddLike = async (req: Request, res: Response) => {
    const { user_id, movie_id } = req.body
    const repository = getManager().getRepository(Movie);
    const movie = await repository.findOne(movie_id);
    const movieLikes = serializeArray(movie.likes)

    if (movieLikes.includes(user_id)) {
        res.status(400).send({ message: "Already liked!" })
    } else {
        const newLikeArray = pushToDBArray(movie.likes, user_id)
        const newMovie = await repository.update(movie_id, { likes: newLikeArray })
        res.status(200).send({ message: "Succesfully liked" })

        movie.likeCount = countDBArray(movie.likes)
        await repository.update(movie_id, { likeCount: movie.likeCount })
    }


};


