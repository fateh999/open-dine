import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscriptions
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 grid-cols-1">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Type
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Date
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="bg-accent">
                        <TableCell>
                          <div className="font-medium">Liam Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            Fulfilled
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-23
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Olivia Smith</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            olivia@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Refund
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="outline">
                            Declined
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-24
                        </TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Noah Williams</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            noah@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Subscription
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            Fulfilled
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-25
                        </TableCell>
                        <TableCell className="text-right">$350.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Emma Brown</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            emma@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            Fulfilled
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-26
                        </TableCell>
                        <TableCell className="text-right">$450.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Liam Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            Fulfilled
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-23
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Liam Johnson</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            Fulfilled
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-23
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Olivia Smith</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            olivia@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Refund
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="outline">
                            Declined
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-24
                        </TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Emma Brown</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            emma@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            Fulfilled
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-06-26
                        </TableCell>
                        <TableCell className="text-right">$450.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
