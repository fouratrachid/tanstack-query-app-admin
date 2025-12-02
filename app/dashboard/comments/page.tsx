"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Pencil } from "lucide-react";
import { getComments, deleteComment } from "@/lib/api";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { EditCommentDialog } from "./edit-comment-dialog";
import { Comment } from "@/lib/types";

export default function CommentsPage() {
  const [page, setPage] = useState(1);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["comments", page],
    queryFn: () => getComments({ page, limit: 15 }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });
      setDeleteCommentId(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Comments</h1>
          <p className="text-gray-600 mt-1">Moderate user comments</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Comments</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Comment</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Post</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell className="max-w-md">
                        <p className="line-clamp-2">{comment.content}</p>
                      </TableCell>
                      <TableCell>{comment.user.name}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {comment.post?.title || "N/A"}
                      </TableCell>
                      <TableCell>
                        {format(new Date(comment.createdAt), "PP")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingComment(comment)}
                          >
                            <Pencil className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteCommentId(comment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {data && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-600">
                    Showing {(page - 1) * 15 + 1} to{" "}
                    {Math.min(page * 15, data.meta.total)} of {data.meta.total}{" "}
                    comments
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={!data.meta.hasPreviousPage}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => p + 1)}
                      disabled={!data.meta.hasNextPage}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <EditCommentDialog 
        comment={editingComment} 
        open={!!editingComment} 
        onOpenChange={(open) => !open && setEditingComment(null)} 
      />

      <AlertDialog
        open={!!deleteCommentId}
        onOpenChange={() => setDeleteCommentId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the comment. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteCommentId && deleteMutation.mutate(deleteCommentId)
              }
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
