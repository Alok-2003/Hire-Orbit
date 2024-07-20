"use client";

import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";

function PostNewJob() {
  return (
    <div>
      <Button className="disabled:opacity-60 flex h-11 items-center justify-center px-5">
        Post new job
      </Button>
      <Dialog>
        
      </Dialog>
    </div>
  );
}

export default PostNewJob;
