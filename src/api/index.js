import { Router } from 'express';

export default () => {
	const router = Router();
	
	router.get('/', (req, res) => {
		res.status(200).send({
			message: 'Custom express API',
			data: {
				version: 'v1'
			}
		});
	});

	return router;
};
