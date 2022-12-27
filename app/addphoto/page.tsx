import fs from 'fs/promises';
import path from 'path';
import ImageUploadForm from './imageUploadForm';

export const dynamic = 'force-dynamic';

const PhotoPage = async() => {

  const serverProps: string[] = [];

  const getServerProps = async() => {
    const props = { dirs: [] };
    try {
      const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"));
      props.dirs = dirs as any;
      serverProps.push(...props.dirs);
      return 
    } catch (error) {
      return { props };
    }
  };

  await getServerProps();

  console.log(serverProps)
  return <ImageUploadForm serverProps={serverProps}/>
}

export default PhotoPage