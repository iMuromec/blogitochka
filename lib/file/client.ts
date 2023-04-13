interface uploadFileProps {
  file: any;
  postSlug?: string | undefined | null | boolean;
  updateDb?: (image: string) => Promise<any>;
}

export async function uploadFile({
  file,
  postSlug,
  updateDb,
}: uploadFileProps) {
  try {
    if (!file.name || !file.type) {
      throw new Error("Wrong file format");
    }

    const params: any = {
      fileName: file.name,
      fileType: file.type,
    };

    if (postSlug) {
      params["postSlug"] = postSlug;
    }

    const urlParams = new URLSearchParams(params).toString();
    const url = `/api/file?${urlParams}`;

    const uploadUrls = await fetch(url);

    const { signedUrl, fileUrl } = await uploadUrls.json();

    const uploadFileToStorage = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Access-Control-Request-Method": "PUT",
      },
      body: file,
    });

    if (!uploadFileToStorage.ok) {
      return {
        error: `Ошибка ${uploadFileToStorage.status} ${uploadFileToStorage.statusText}`,
      };
    }

    if (updateDb) {
      const updated = await updateDb(fileUrl);

      if (!updated.ok) {
        return {
          error: `Ошибка ${updated.status} ${updated.statusText}`,
        };
      }
    }

    return { fileUrl };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

interface updateUserProps {
  name?: string;
  image?: string;
}

export async function updateUser(data: updateUserProps) {
  try {
    return await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
    return error;
  }
}

interface updateSiteProps {
  subdomain?: string;
  name?: string;
  logo?: string;
}

export async function updateSite(data: updateSiteProps) {
  try {
    return await fetch("/api/site", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
    return error;
  }
}

interface updatePostProps {
  id?: string;
  image?: string;
}

export async function updatePost(data: updatePostProps) {
  try {
    return await fetch("/api/posts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
    return error;
  }
}
