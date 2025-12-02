import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateComment } from "@/lib/api";
import { Comment } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface EditCommentDialogProps {
  comment: Comment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCommentDialog({ comment, open, onOpenChange }: EditCommentDialogProps) {
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    if (comment) {
      setContent(comment.content);
    }
  }, [comment]);

  const mutation = useMutation({
    mutationFn: (data: { content: string }) => {
      if (!comment) throw new Error("No comment selected");
      return updateComment(comment.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast({
        title: "Success",
        description: "Comment updated successfully",
      });
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update comment",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ content });
  };

  if (!comment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>
              Update comment content
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-comment">Content</Label>
              <Textarea
                id="edit-comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
