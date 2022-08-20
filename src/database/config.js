import fs from 'fs';

const databaseConfig = async () => {

    const workDir = process.cwd();
    const targetJsonFile = workDir + '/src/db.json';
    const modelJsonFile = workDir + '/src/database/model.json';

    const modelJson = await fs.readFileSync(modelJsonFile, {encoding:'utf8', flag:'r'});

    if (!fs.existsSync(targetJsonFile)) {
      console.log('Creating database json file...');
	  	await fs.writeFileSync(targetJsonFile, modelJson);			
	}

}

export default databaseConfig;
